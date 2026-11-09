// Mostra a mensagem de erro vinda do redirecionamento (?erro=senha|bloqueado).
const erro = new URLSearchParams(location.search).get('erro');
if (erro) {
  const el = document.getElementById('erro');
  el.hidden = false;
  el.textContent = erro === 'bloqueado' ? 'Muitas tentativas. Aguarde 15 minutos.' : 'Senha incorreta.';
}
