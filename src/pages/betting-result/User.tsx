export default function User({ id }: { id: string | undefined }) {
  return (
    <div className="flex flex-row">
      <div className="text-2xl pr-2">{"😁"}</div>
      <div className="font-bold text-2xl"> {id}</div>
    </div>
  );
}
