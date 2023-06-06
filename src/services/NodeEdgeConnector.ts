interface Node {
  width: number;
  height: number;
  id: string;
  type: string;
  data: {
    label: string;
  };
  position: {
    x: number;
    y: number;
  };
  style?: {
    border?: string;
    width?: number;
  };
  selected?: boolean;
  positionAbsolute?: {
    x: number;
    y: number;
  };
  dragging?: boolean;
}

interface Edge {
  source: string;
  sourceHandle: null;
  target: string;
  targetHandle: string;
  id: string;
}

interface GraphData {
  nodes: Node[];
  edges: Edge[];
  viewport: {
    x: number;
    y: number;
    zoom: number;
  };
}

const connectEdgesToNodes = (graphData: GraphData) => {
  const { nodes, edges } = graphData;

  const getNodeById = (id: string): Node | undefined => nodes.find((node) => node.id === id);

  const getConnectedEdges = (nodeId: string): Edge[] =>
    edges.filter((edge) => edge.source === nodeId || edge.target === nodeId);

  const nodeLinks: Record<string, string[]> = {};

  nodes.forEach((node) => {
    const connectedEdges = getConnectedEdges(node.id);
    // @ts-ignore
    const connectedNodeIds = [...new Set(connectedEdges.flatMap((edge) => [edge.source, edge.target]))];

    nodeLinks[node.id] = connectedNodeIds;
  });

  return nodeLinks;
};

export { connectEdgesToNodes };