const columns = [
  {
    key: "name",
    label: "Project",
  },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <Badge variant="success">
        {row.status}
      </Badge>
    ),
  },
  {
    key: "budget",
    label: "Budget",
  },
];

const data = [
  {
    id: 1,
    name: "Website Redesign",
    status: "Active",
    budget: "$5,000",
  },
];

export default function ProjectsPage() {
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
}