export default function Subscription() {
  function handleSubmit(e) {
    e.preventDefault();
    alert("Subscribed successfully!");
  }
  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-500 mt-3">
        Be the first to know about new arrivals, sales & promos!
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full flex-1 outline-none"
          type="email"
          required
          placeholder="Enter your email"
        />
        <button className="bg-black text-white text-xs px-10 py-4">
          Subscribe
        </button>
      </form>
    </div>
  );
}
