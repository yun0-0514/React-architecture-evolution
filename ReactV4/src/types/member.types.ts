export interface Member {
  id: string | number;
  password: string;
  name: string;
  phone: string;
  birth: string;
}

export interface MemberState {
  members: Member[];
  initialized: boolean;
}

export interface MemberStateContextType {
  members: Member[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

interface InitAction {
  type: "INIT";
  members: Member[];
}

interface CreateAction {
  type: "CREATE";
  member: Member;
}
interface UpdateAction {
  type: "UPDATE";
  member: Member;
}
interface DeleteAction {
  type: "DELETE";
  id: string | number;
}
export type MemberAction =
  | InitAction
  | CreateAction
  | UpdateAction
  | DeleteAction;

export interface MemberProviderProps {
  children: React.ReactNode;
}

export interface MemberDispatchContextType {
  onInit: (data: Member[]) => void;
  onCreate: (data: Member) => void;
  onUpdate: (data: Member) => void;
  onDelete: (id: string | number) => void;
}
