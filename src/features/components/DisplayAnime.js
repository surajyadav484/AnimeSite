export const DisplayAnime = ({
  url,
  images: {
    jpg: { image_url },
  },
  title,
  title_japanese,
  genres,
  score,
}) => {
  const name = genres.reduce((a, b) => `${a} | ${b.name}`, "");

  return (
    <>
      <div className="card" style={{ width: "16rem" }}>
        <img className="card-img-top" src={image_url} alt="" height={335} />

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{name}</p>
          <p className="card-text">{score}/10</p>
        </div>
      </div>
    </>
  );
};
