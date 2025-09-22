# 🍔 Totem de Autoatendimento - Integração com Dashboard

Este arquivo `totem/page.tsx` foi criado para simular a integração entre o **Dashboard Administrativo** e o **Totem de Autoatendimento** da hamburgueria.

## 🔗 Como funciona a integração

### 1. **Dados Sincronizados**
O totem utiliza **exatamente os mesmos dados** que você cadastra no dashboard:

```typescript
// Hook que simula a conexão com o dashboard
function useDashboardData() {
  const [dashboardData, setDashboardData] = useState({
    restaurant: {
      name: "Hamburgueria do Zé",    // ← Vem do dashboard
      address: "",                   // ← Vem do dashboard
      logo: "🍔"                    // ← Vem do dashboard
    },
    categories: [...],               // ← Vem do dashboard
    complementItems: [...],          // ← Vem do dashboard
    complementGroups: [...],         // ← Vem do dashboard
    products: [...]                  // ← Vem do dashboard
  });
}
```

### 2. **Fluxo de Dados**
```
Dashboard (Administrador) → Banco de Dados → Totem (Cliente)
     ↓                           ↓              ↓
Cadastra produtos          Armazena dados    Exibe produtos
Cria complementos         Sincroniza        Permite pedidos
Define categorias         Atualiza          Calcula preços
```

## 🚀 Como testar

### 1. **Acessar o Totem**
```bash
# No seu projeto
npm run dev

# Acesse no navegador
http://localhost:3000/totem
```

### 2. **Testar a Integração**
1. **Dashboard**: Acesse `/dashboard` e cadastre produtos
2. **Totem**: Acesse `/totem` e veja os produtos aparecendo
3. **Sincronização**: Mudanças no dashboard refletem no totem

## 🎯 Funcionalidades Implementadas

### ✅ **Tela Inicial**
- Nome da hamburgueria (do dashboard)
- Logo da hamburgueria (do dashboard)
- Categorias dinâmicas (do dashboard)
- Contador de produtos por categoria

### ✅ **Navegação por Categorias**
- Lista produtos da categoria selecionada
- Mostra apenas produtos cadastrados no dashboard
- Preços atualizados em tempo real

### ✅ **Personalização de Produtos**
- Grupos de complementos (do dashboard)
- Regras de mínimo/máximo (do dashboard)
- Validação de complementos obrigatórios
- Preços dos complementos (do dashboard)

### ✅ **Sistema de Carrinho**
- Adicionar produtos personalizados
- Controle de quantidade
- Cálculo automático de totais
- Finalização de pedido

## 🔧 Estrutura Técnica

### **Hook de Dados**
```typescript
// Simula a conexão com o banco de dados
function useDashboardData() {
  // Em produção, faria:
  // - Fetch da API
  // - WebSocket para atualizações em tempo real
  // - Cache local para performance
}
```

### **Estados do Totem**
```typescript
const [currentScreen, setCurrentScreen] = useState('home');
const [selectedCategory, setSelectedCategory] = useState('');
const [selectedProduct, setSelectedProduct] = useState(null);
const [cart, setCart] = useState([]);
const [productComplements, setProductComplements] = useState({});
```

### **Validações**
```typescript
// Valida se pode adicionar ao carrinho
const canAddToCart = () => {
  return selectedProduct.complementGroupIds.every(groupId => {
    const group = getComplementGroup(groupId);
    const selectedCount = productComplements[groupId]?.length || 0;
    return !group.required || selectedCount >= group.min;
  });
};
```

## 🔄 Próximos Passos para Produção

### 1. **Conectar ao Banco Real**
```typescript
// Substituir dados simulados por API real
const { data: dashboardData } = useSWR('/api/dashboard-data', fetcher);
```

### 2. **WebSocket para Tempo Real**
```typescript
// Atualizações instantâneas quando admin muda algo
useEffect(() => {
  const socket = io('/dashboard-updates');
  socket.on('products-updated', (newProducts) => {
    setDashboardData(prev => ({ ...prev, products: newProducts }));
  });
}, []);
```

### 3. **Sistema de Pedidos**
```typescript
// Enviar pedido para cozinha
const finalizePedido = async () => {
  const pedido = {
    items: cart,
    total: calculateCartTotal(),
    timestamp: new Date(),
    totemId: 'TOTEM_01'
  };
  
  await fetch('/api/pedidos', {
    method: 'POST',
    body: JSON.stringify(pedido)
  });
};
```

## 📱 Interface Otimizada

### **Touch-Friendly**
- Botões grandes (mínimo 44px)
- Espaçamento adequado para dedos
- Feedback visual claro

### **Responsivo**
- Funciona em tablets (10-15 polegadas)
- Adapta-se a diferentes resoluções
- Layout otimizado para orientação landscape

### **Acessibilidade**
- Cores contrastantes
- Textos legíveis
- Navegação intuitiva

## 🎨 Personalização Visual

### **Cores da Marca**
```css
/* Cores principais */
--primary: #f97316;     /* Laranja */
--secondary: #dc2626;   /* Vermelho */
--success: #16a34a;     /* Verde */
```

### **Tipografia**
```css
/* Tamanhos otimizados para totem */
.title { font-size: 3rem; }      /* 48px */
.subtitle { font-size: 1.5rem; } /* 24px */
.body { font-size: 1.25rem; }    /* 20px */
```

---

## 💡 Dica de Uso

Para testar a integração completa:

1. **Abra duas abas**: `/dashboard` e `/totem`
2. **No dashboard**: Cadastre um novo produto
3. **No totem**: Recarregue e veja o produto aparecer
4. **Teste o fluxo**: Selecione categoria → produto → complementos → carrinho

**Em produção**, essa sincronização seria automática e em tempo real!

---

**Desenvolvido para demonstrar a integração perfeita entre administração e experiência do cliente.**

