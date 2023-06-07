export interface Root {
    _id: string;
    situation: SituationType
    flow: Flow[]
    row: Row
  }
  
  export interface SituationType {
    map(arg0: (item: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    title: string
    description: string
    image_path: string
  }
  
  export interface Flow {
    id: number
    label: string
    type: string
    edge: number[]
    audio_path: string
  }
  
  export interface Row {}