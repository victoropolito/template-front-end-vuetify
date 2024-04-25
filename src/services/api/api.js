// Função para criar um novo usuário

export function createUser() {
  const apiURL = "https://nodejs-nest-postgresql.cyclic.app";
  const newUser = {
    name: "Teste",
    email: "testeteste@example.com",
    password: "123456",
    photo: "@/assets/static/profile-photo.jpg"
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  };

  return fetch(apiURL, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log("Novo usuário criado:", data);
      return data; // Retorna os dados da API para utilização na interface, se necessário
    })
    .catch(error => {
      console.error("Erro ao criar usuário:", error);
      throw error; // Lança o erro para ser tratado onde a função for chamada
    });
}
