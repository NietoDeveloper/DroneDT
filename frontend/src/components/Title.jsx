export default function Title({ title1, title2, caption }) {
  return (
    <>
      <p className="text-gray-500 mb-3">
        {title1} <span className="text-gray-700 font-medium">{title2}</span>
      </p>
      {caption && <p className="text-base text-gray-600">{caption}</p>}
    </>
  );
}
