import React, {useState, useRef, useCallback, SetStateAction, useMemo, useEffect} from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  Edge, updateEdge, applyNodeChanges, Node, ReactFlowInstance, NodeMouseHandler,
} from 'reactflow';
import 'reactflow/dist/style.css';
import AnswerNode from "./CustomNodes/AnswerNode";
import QuestionNode from "./CustomNodes/QuestionNode";

import Sidebar from './Sidebar';

import './SituationFlow.css';
import ImageNode from "./CustomNodes/ImageNode";
import SoundNode from "./CustomNodes/SoundNode";
import InitialNode from "./CustomNodes/InitialNode";
import finalNode from "./CustomNodes/FinalNode";
import api from "../../services/API";
import { useNavigate } from "react-router-dom";
import SituationForm from "./Form/SituationForm";
import {type} from "os";

type SituationFlowProps = {
  situationId?: string | undefined;
}

const initialNodes = [
  {
    id: '1',
    type: 'initial',
    data: {label: 'Début de la situation'},
    position: {x: 250, y: 5},
    style: {border: '1px solid red', width: 400},
  },
  {
    id: '2',
    type: 'final',
    data: {
      label: 'Fin de la situation'
    },
    position: {x: 250, y: 400},
    style: {border: '1px solid red', width: 400},
  }
];
const getId = (type: string) => {
  return `${type}-${+new Date()}`;
}

const CreateSituationFlow = ({ situationId }: SituationFlowProps) => {
  const edgeUpdateSuccessful = useRef(true);
  const reactFlowWrapper = useRef(null);
  const [selectedNode, setSelectedNode] = useState<Node|null>(null);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState({ disabled: true , message: 'Veuillez remplir le formulaire' });
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const onConnect = useCallback((params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)), []);
  const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const formStoreRef = useRef<{ title: string, description: string } | null>(null);
  const [formStore, setFormStore] = useState(null);
  const handleFormUpdate = useCallback((formStore: { title: string, description: string }) => {
    formStoreRef.current = formStore;
  }, []);

  useEffect(() => {
    if (situationId) {
      api.get(`/situations/${situationId}`).then((res) => {
        const flow = res.data.raw;
        const situationDescription = res.data.situation;
        const situationNodes = flow.nodes;
        const situationEdges = flow.edges;
        reactFlowInstance?.setNodes(situationNodes);
        reactFlowInstance?.setEdges(situationEdges);
        setNodes(situationNodes);
        setEdges(situationEdges);
        setFormStore(situationDescription);
      });
    } else {
      setNodes(initialNodes);
    }
  }, [situationId]);

  useEffect(() => {
    saveDisable();
  }, [nodes,  edges, formStoreRef, formStore]);

  /**
   * Since we're updating the edges we need to call our custom nodes
   * inside our component using useMemo
  */
  const nodeTypes = useMemo(() => ({
    answer: AnswerNode,
    question: QuestionNode,
    image: ImageNode,
    sound: SoundNode,
    initial: InitialNode,
    final: finalNode
  }), []);

  const navigate = useNavigate();

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      // @ts-ignore
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const situationType = event.dataTransfer.getData('application/situationType');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
      // @ts-ignore
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      let label;
      switch (situationType) {
        case 'question':
          label = 'Question';
          break;
        case 'image':
          label = 'Image';
          break;
        case 'sound':
          label = 'Son';
          break;
        case 'input':
          label = 'Début de la situation';
          break;
        case 'output':
          label = 'Fin de situation';
          break;
        case 'answer':
          label = 'Réponse';
          break
        default:
          label = 'Inconnue';
          break;
      }

      const newNode = {
        id: getId(type),
        type,
        position,
        data: { label: label },
      };

      setNodes((nds) => nds.concat(newNode));

    }, [reactFlowInstance]
  );

  const onSave = useCallback(async () => {
    if (reactFlowInstance) {
      // @ts-ignore
      let flowData = reactFlowInstance.toObject();

      const updatedNodes = flowData.nodes.map(node => ({
        ...node,
        edges: flowData.edges.filter(edge => edge.source === node.id)
      }));

      const filteredArray = updatedNodes.map((obj) => {
        const {id, type} = obj;
        const {label} = obj.data;
        const targets = obj.edges
            .map((edge) => edge.target)
            .filter((target) => {
              const targetObj = updatedNodes.find((node) => node.id === target);
              // @ts-ignore
              return targetObj.type !== 'image' && targetObj.type !== 'sound';
            });

        const media = obj.edges
            .filter((edge) => {
              const targetObj = updatedNodes.find((node) => node.id === edge.target);
              // @ts-ignore
              return targetObj.type === 'image' || targetObj.type === 'sound';
            })
            .map((edge) => {
              const targetObj = updatedNodes.find((node) => node.id === edge.target);
              // @ts-ignore
              return {id: targetObj.data.storeId, path: targetObj.data.label, type: targetObj.type};
            });

        return {id, label, type, targets, media};
      });


      const localStorageKey = 'raw';
      const flow = 'flow';
      const situation = 'situation';
      localStorage.setItem(situation, JSON.stringify(formStoreRef.current));
      localStorage.setItem(flow, JSON.stringify(filteredArray));
      localStorage.setItem(localStorageKey, JSON.stringify(reactFlowInstance.toObject()));

      const returnObj = {
        situation: formStoreRef.current,
        flow: filteredArray,
        raw: reactFlowInstance.toObject()
      };

      if (situationId) {
        try {
          const response = await api.put(`situations/${situationId}`, returnObj);
          if (response.status === 200) {
            navigate('/administration/situations')
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const response = await api.post('situations', returnObj);
          if (response.status === 201) {
            navigate('/administration/situations')
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    if (reactFlowInstance) {
      const localStorageKey = 'reactflow';
      let flow = null;
      if (situationId) {
        api.get(`situations/${situationId}`).then((response) => {
          flow = response.data.raw;
          if (flow) {
            setNodes(flow.nodes);
            setEdges(flow.edges);
          }
        });
      } else {
        flow = localStorage.getItem(localStorageKey);
        if (flow) {
          // @ts-ignore
          const flowParsed = JSON.parse(flow);
          const {nodes: nodesParsed, edges: edgesParsed} = flowParsed;
          setNodes(nodesParsed);
          setEdges(edgesParsed);
        }
      }
    }
  }, [reactFlowInstance]);

  const onDelete = () => {
    if (selectedNode) {
      const { id } = selectedNode;
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
      setSelectedNode(null)
    }
  };

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onNodesChange = useCallback(
    (changes: SetStateAction<any>) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const saveDisable = () => {
    const initialNode = nodes.find((node) => node.type === 'initial');
    const finalNode = nodes.find((node) => node.type === 'final');
    const questionNodes = nodes.filter((node) => node.type === 'question');
    const answerNodes = nodes.filter((node) => node.type === 'answer');

    if (nodes.length < 2) {
      return setIsSaveDisabled({disabled: true, message: 'Merci de terminer la situation avant de la sauvegarder'});
    }

    if (!initialNode || !finalNode) {
      return setIsSaveDisabled({disabled: true, message: 'Merci de terminer la situation avant de la sauvegarder'});
    }

    if (!formStoreRef.current?.title || !formStoreRef.current?.description) {
      return setIsSaveDisabled({disabled: true, message: 'Merci de renseigner un titre et une description'});
    }

    if (questionNodes.length < 1 && answerNodes.length < 2) {
      return setIsSaveDisabled({disabled: true, message: 'Merci de renseigner au minimum une question et deux réponses'});
    }

    return setIsSaveDisabled({disabled: false, message: ''});
  };

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: Edge<any>, newConnection: Connection) => {
    edgeUpdateSuccessful.current = false;
    setEdges((eds) => updateEdge(oldEdge, newConnection, eds));
  }, []);

  const onEdgeUpdateEnd = useCallback((_: any, edge: { id: string; }) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  // Method to check if the connection is valid
  const isValidConnection = (connection: Connection): boolean => {
    const sourceNode = nodes.find((node) => node.id === connection.source);
    const targetNode = nodes.find((node) => node.id === connection.target);

    if (sourceNode && targetNode) {
      if (
        // Define the valid connections here
        (sourceNode.type === 'initial' && targetNode.type === 'answer') ||
        (sourceNode.type === 'answer' && targetNode.type === 'question') ||
        (sourceNode.type === 'answer' && targetNode.type === 'final') ||
        (sourceNode.type === 'question' && targetNode.type === 'answer') ||
        (targetNode.type === 'output' && sourceNode.type === 'answer') ||
        (targetNode.type === 'sound' && ['question', 'answer', 'initial', 'final'].includes(sourceNode.type as string)) ||
        (targetNode.type === 'image' && ['question', 'answer', 'initial', 'final'].includes(sourceNode.type as string))
      ) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <SituationForm onUpdate={handleFormUpdate}/>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onInit={setReactFlowInstance as SetStateAction<any>}
            onDrop={onDrop}
            onDragOver={onDragOver}
            isValidConnection={isValidConnection}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar {...{ onSave, onRestore , onDelete , selectedNode, isSaveDisabled}} />
      </ReactFlowProvider>
    </div>
  );
};

export default CreateSituationFlow;