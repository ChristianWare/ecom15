

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
        <div className="basis-2/5">
          <p>loading...</p>
        </div>
        <div className="basis-3/5 space-y-5">
          <p>loading...</p>
          <p>loading...</p>
          <p>loading...</p>
          <p>loading...</p>
        </div>
      </div>
    </main>
  );
}
