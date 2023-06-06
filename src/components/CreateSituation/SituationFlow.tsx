import React, { useState, useRef, useCallback, SetStateAction, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  Edge, updateEdge, getConnectedEdges, applyNodeChanges, Node, ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';
import AnswerNode from "./CustomNodes/AnswerNode";
import QuestionNode from "./CustomNodes/QuestionNode";
import {connectEdgesToNodes} from "../../services/NodeEdgeConnector";

import Sidebar from './Sidebar';

import './SituationFlow.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: {label: 'Les secours le 112 bonjour?'},
    position: {x: 250, y: 5},
    style: {border: '1px solid red', width: 400},
  },
  {
    id: '2',
    type: 'answer',
    data: {label: 'Oui bonjour, je suis au 1 rue de la paix à Paris, il y a un incendie dans mon immeuble'},
    position: {x: 250, y: 100},
    style: {width: 400},
  },
  {
    id: '3',
    type: 'question',
    data: {label: 'Est-ce que vous êtes en sécurité ?'},
    position: {x: 250, y: 200},
    style: {width: 400},
  },
  {
    id: '4',
    type: 'answer',
    data: {label: 'Oui, je suis en sécurité'},
    position: {x: 250, y: 300},
    style: {width: 400},
  },
  {
    id: '5',
    type: 'output',
    data: {
      label: 'Le SAMU Bonjour, les pompiers nous ont expliqué la situation !\n' +
        'Ils sont en route pour venir à XX Adresse.\n' +
        'Grâce à vous nous avons tous les éléments nécessaires pour intervenir.\n' +
        'Vous pouvez raccrocher'
    },
    position: {x: 250, y: 400},
    style: {border: '1px solid red', width: 400},
  }
];

let id = Number(initialNodes[initialNodes.length - 1].id) + 1;
const getId = () => `${id++}`;

const CreateSituationFlow = () => {
  const edgeUpdateSuccessful = useRef(true);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const onConnect = useCallback((params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)), []);
  const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Since we're updating the edges we need to call our custom nodes
   * inside our component using useMemo
  */
  const nodeTypes = useMemo(() => ({
    answer: AnswerNode,
    question: QuestionNode,
  }), []);

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

      const label = situationType === 'question' ? 'Question' : 'Réponse';

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: label },
      };

      setNodes((nds) => nds.concat(newNode));
    }, [reactFlowInstance]
  );

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      // @ts-ignore
      console.log('rfInstance', connectEdgesToNodes(reactFlowInstance.toObject()));
      const localStorageKey = 'reactflow';
      localStorage.setItem(localStorageKey, JSON.stringify(reactFlowInstance.toObject()));
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    if (reactFlowInstance) {
      //
    }
  }, [reactFlowInstance]);

  const onNodesChange = useCallback(
    (changes: SetStateAction<any>) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

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
        (sourceNode.type === 'input' && targetNode.type === 'answer') ||
        (sourceNode.type === 'answer' && targetNode.type === 'question') ||
        (sourceNode.type === 'answer' && targetNode.type === 'output') ||
        (sourceNode.type === 'question' && targetNode.type === 'answer') ||
        (targetNode.type === 'output' && sourceNode.type === 'answer')
      ) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
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
            onNodeClick={(event, node) => {console.log('click', node); console.log(getConnectedEdges([node], edges))}}
            onInit={setReactFlowInstance as SetStateAction<any>}
            onDrop={onDrop}
            onDragOver={onDragOver}
            isValidConnection={isValidConnection}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar {...{ onSave, onRestore }} />
      </ReactFlowProvider>
    </div>
  );
};

export default CreateSituationFlow;