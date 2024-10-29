interface LoadingButtonProps {
  loading: boolean;
  onClick: any;
  children: React.ReactNode;
}

export function LoadingButton({
  loading,
  onClick,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      className="rounded-md bg-red-700 p-3 text-white"
      disabled={loading}
      {...props}
    >
      {loading && "loading..."}
      {props.children}
    </button>
  );
}
