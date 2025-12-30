import { Member } from "./member.types";

export interface Formprops {
  selectedMember: Member | null;
  clearSelection: () => void;
}

export interface Cardprops {
  data: Member;
  onEdit: (member: Member) => void;
}
