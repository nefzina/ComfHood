import "../scss/home.scss";

export default function Home() {
  return (
    <>
      <div>top</div>
      <div className="bestSellersSection">
        <h2>BestSellers</h2>
        <div className="background">
          <i className="col col1" />
          <i className="col col2" />
          <i className="col col3" />
        </div>

        <div className="bestSellers" />
      </div>
    </>
  );
}
