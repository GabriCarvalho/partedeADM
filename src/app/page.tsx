import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          🍔 Bem-vindo ao <span className="text-red-500">Point</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Cadastre sua hamburgueria, organize seu cardápio e mostre seus
          melhores lanches para o mundo!
        </p>

        {/* Botões de ação */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-red-500 text-white rounded-2xl shadow hover:bg-red-600 transition"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-gray-200 rounded-2xl shadow hover:bg-gray-300 transition"
          >
            Criar Conta
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mt-20 grid gap-8 md:grid-cols-3 max-w-5xl w-full px-6">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">📋 Cadastro fácil</h2>
          <p className="text-gray-600">
            Registre sua hamburgueria em minutos e já comece a organizar tudo.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">🍟 Cardápio completo</h2>
          <p className="text-gray-600">
            Adicione hambúrgueres, fotos e preços para mostrar aos seus
            clientes.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">📊 Controle prático</h2>
          <p className="text-gray-600">
            Acompanhe seus restaurantes e edite as informações a qualquer hora.
          </p>
        </div>
      </section>
    </main>
  );
}
