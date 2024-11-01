interface LoadingButtonProps {
  loading: boolean;
  disabled: boolean;
  onClick: any;
  children: React.ReactNode;
}

export default function LoadingButton({
  loading,
  onClick,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      className="rounded-md bg-red-700 p-3 text-white"
      disabled={loading || disabled}
      {...props}
    >
      {loading && "loading..."}
      {props.children}
    </button>
  );
}
