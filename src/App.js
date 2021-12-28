import { useEffect, useState } from "react";
import { fetchImages} from "./api";

function Header() {
  return (
    <header className="hero is-success is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">犬の画像、集めました。</h1>
          <h2 className="subtitle">可愛い犬の画像をランダムに表示します。</h2>
        </div>
      </div>
    </header>
  );
}


function Image(props){
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.src} alt="cute dog" />
          
        </figure>
      </div>
    </div>
  );
}

function Loading(){
  return <p><strong>画像を読み込んでいます...</strong></p>;
}

function Gallery(props) {
  const { urls } = props;
  if(urls == null){
    return <Loading />;
  }
  return (
    <div className="columns is-vcenterd is-multiline">
            {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
}

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    props.onFormSubmit(breed.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth is-primary">
              <select name="breed" defaultValue="shiba">
                <option value="shiba">柴犬</option>
                <option value="akita">秋田犬</option>
                <option value="beagle">ビーグル</option>
                <option value="chihuahua">チワワ</option>
                <option value="collie">ボーダーコリー</option>
                <option value="dachshund">ダックスフント</option>
                <option value="poodle">プードル</option>
                <option value="pomeranian">ポメラニアン</option>
                <option value="retriever">レトリーバー</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-primary">
              検索
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("shiba").then((urls) => {
      setUrls(urls);
    });
  },[]);
  function reloadImages(breed) {
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });
  }
  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container is-fluid">
          <div className="notification is-primary">
            <Gallery urls={urls} />
          </div>
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>&copy;5420034 四ツ目蒼太</p>
        <p>このサイトは日本大学文理学部情報科学科 Webプログラミングの演習課題3として作成しました。</p>
        <p>Dog images are retrieved from Dog API</p>
        <p>
          <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;