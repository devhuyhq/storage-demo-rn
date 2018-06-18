export const GroupSchema = {
  name: "Group",
  primaryKey: "id",
  properties: {
    name: "string",
    id: "string",
    users: "User[]",
    main: "User"
  }
};
