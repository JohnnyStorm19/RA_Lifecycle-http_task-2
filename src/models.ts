export interface INoteItemProps {
    data: INoteItem, 
    onDeleteCallback: (element: React.RefObject<HTMLElement>) => void;
}

export interface INoteItem {
    content: string;
    key: string; 
}

export interface ISubmitCallback {
    onSubmitCallback: (data: INoteItem) => void;
}