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
import AnswerNode from "./CustomNodes/NodesList/AnswerNode";
import QuestionNode from "./CustomNodes/NodesList/QuestionNode";

import Sidebar from './Sidebar';

import './SituationFlow.css';
import ImageNode from "./CustomNodes/NodesList/ImageNode";
import SoundNode from "./CustomNodes/NodesList/SoundNode";
import InitialNode from "./CustomNodes/NodesList/InitialNode";
import finalNode from "./CustomNodes/NodesList/FinalNode";
import API from "../../services/API";
import { useNavigate } from "react-router-dom";
import SituationForm from "./Form/SituationForm";
import { saveChecker } from "../../services/situationFlow/saveChecker";
import { normalizeFlowData } from "../../services/situationFlow/normalizeFlowData";
import {edgeConnectionChecker} from "../../services/situationFlow/edgeConnectionChecker";
import {handleNodeDrop} from "../../services/situationFlow/handleNodeDrop";

type SituationFlowProps = {
  situationId?: string | undefined;
}

type FormStore = {
	title: string;
	description: string;
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
  const onConnect = useCallback((params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const formStoreRef = useRef<{ title: string, description: string } | null>(null);
  const [formStore, setFormStore] = useState<FormStore>({ title: '', description: '' });
  const handleFormUpdate = useCallback((formStore: { title: string, description: string }) => {
    formStoreRef.current = formStore;
  }, []);

  useEffect(() => {
    if (situationId) {
      API.get(`/situations/${situationId}`).then((res) => {
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
  }, [situationId, setEdges, setNodes, reactFlowInstance]);

  useEffect(() => {
    saveChecker(nodes, formStoreRef.current, setIsSaveDisabled);
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

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newNode =  handleNodeDrop(event, reactFlowWrapper, reactFlowInstance, getId);
		// @ts-ignore
	  setNodes((nds) => nds.concat(newNode));

  }, [reactFlowInstance, setNodes]);

  const onSave = useCallback(async () => {
    if (reactFlowInstance) {
			const flowData = reactFlowInstance.toObject();
      const returnObj = normalizeFlowData({flowData, formStoreRef});

			// check if params id exists and update or create accordingly
      if (situationId) {
	      // update
        try {
          const response = await API.put(`situations/${situationId}`, returnObj);
          if (response.status === 200) navigate('/administration/situations');
        } catch (error) {
          console.error(error);
        }
      } else {
				// create
        try {
          const response = await API.post('situations', returnObj);
          if (response.status === 201) navigate('/administration/situations');
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, [reactFlowInstance, navigate, situationId]);

  const onRestore = useCallback(() => {
    if (reactFlowInstance) {
      const localStorageKey = 'raw';
      let flow = null;
      if (situationId) {
        API.get(`situations/${situationId}`).then((response) => {
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
  }, [reactFlowInstance, setNodes, setEdges, situationId]);

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

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: Edge<any>, newConnection: Connection) => {
    edgeUpdateSuccessful.current = false;
    setEdges((eds) => updateEdge(oldEdge, newConnection, eds));
  }, [setEdges]);

  const onEdgeUpdateEnd = useCallback((_: any, edge: { id: string; }) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, [ setEdges ]);

  // Method to check if the connection is valid
  const isValidConnection = (connection: Connection): boolean => {
    return edgeConnectionChecker(connection, nodes)
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