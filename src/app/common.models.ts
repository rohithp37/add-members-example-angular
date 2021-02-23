export interface MembersData {
    id: number;
    name: string;
    family: string;
    items: number;
    dob: string;
}

export interface FormDialogConfig {
    title: string;
    dataLength?: number;
    memberData?: MembersData;
}