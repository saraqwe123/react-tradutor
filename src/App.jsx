import { useEffect, useState } from "react";

function App() {
  const [linguaAtual, novaLingua] = useState("pt-br");
  const [linguaTraduzida, novaLinguaTraduzida] = useState("en-us");
  const [textoAtual, novoTexto] = useState("");
  const [traduzir, traduzido] = useState("");
  const [isLoading, isLoading1] = useState("");
  const [isErro, isErro1 ] = useState("");
  


  useEffect(() => {
    if (textoAtual) {
      traducao();
    }
  }, [textoAtual]);

  const traducao = async () => {
    isLoading1(true);
    isErro1("")

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${textoAtual}!&langpair=${linguaAtual}|${linguaTraduzida}`
      );
  
      const data = await response.json();
      traduzido(data.responseData.translatedText);
      isLoading1(false);


    } catch (e) {
      isErro1("Erro ao traduzir: " + e.message)
    }
  }; 


  function inverteLinguas() {
    novaLingua(linguaTraduzida)
    novaLinguaTraduzida(linguaAtual)
    novoTexto(traduzir)
    traduzido(textoAtual)
    
  }

  const languages = [
    { code: "en-us", name: "Inglês" },
    { code: "es", name: "Espanhol" },
    { code: "fr", name: "Francês" },
    { code: "de", name: "Alemão" },
    { code: "it", name: "Italiano" },
    { code: "pt-br", name: "Português" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
          <h1 className="text-headerColor text-2xl font-bold">Tradutor</h1>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <select
              className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
              value={linguaAtual}
              onChange={(e) => novaLingua(e.target.value)}
            >
              {languages.map((lingua) => (
                <option key={lingua.code} value={lingua.code}>
                  {lingua.name}
                </option>
              ))}
            </select>

            <button className="p-2 rounded-full hover:bg-gray-100 outline-none" onClick={inverteLinguas}>
              <svg
                className="w-5 h-5 text-headerColor"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>

            <select
              className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
              value={linguaTraduzida}
              onChange={(e) => novaLinguaTraduzida(e.target.value)}
            >
              {languages.map((lingua) => (
                <option key={lingua.code} value={lingua.code}>
                  {lingua.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-4">
              <textarea
                className="w-full h-40 text-lg text-textColor bg-transparent resize-none border-none outline-none"
                placeholder="Digite seu texto..." value={textoAtual} onChange={(e) => novoTexto(e.target.value)}
              ></textarea>
            </div>

            <div className="relative p-4 bg-secondaryBackground border-l border-gray-200">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-blue-500 border-t-2"></div>
                </div>
              ) : (
                <p className="text-lg text-textColor">{traduzir}</p>
              )}
            </div>
          </div>

          {isErro && (
            <div className="p-4 bg-red-100 border-t border-red-400 text-red-700">
              {isErro}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-3 text-sm text-headerColor">
          &copy; {new Date().getFullYear()} Tradutor
        </div>
      </footer>
    </div>
  );
}

export default App;
