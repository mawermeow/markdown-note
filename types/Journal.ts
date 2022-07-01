export type JournalData={
    title:string,
    content:string|{},
}

export type JournalStatus={
    status:string,
    message:string,
}
export type ToolBoxItem = {
    name:string,
    icon:JSX.Element,
    method:()=>void
};