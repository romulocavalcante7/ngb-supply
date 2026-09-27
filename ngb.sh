#!/bin/bash

# NGB Supply - CLI de Desenvolvimento
# Script facilitador para desenvolvedores da equipe

echo "==========================================="
echo "        NGB SUPPLY - DEV MANAGER           "
echo "==========================================="
echo ""
echo "O que você deseja fazer?"
echo "1) ⬇️  Puxar as alterações (Sincronizar com GitHub)"
echo "2) 🚀 Rodar o desenvolvimento local (Front + Back)"
echo "3) ⬆️  Salvar e Enviar alterações (Commit & Push)"
echo ""
read -p "Escolha uma opção (1, 2 ou 3): " opcao

case $opcao in
  1)
    echo "Puxando atualizações do repositório..."
    git pull origin main
    echo "Instalando possíveis dependências novas..."
    npm install
    echo "✅ Sincronização concluída!"
    ;;
  2)
    echo "Iniciando os servidores de desenvolvimento..."
    echo "Acesse o Frontend em: http://localhost:5173"
    echo "O Backend roda na porta 3001"
    npm run dev
    ;;
  3)
    read -p "Digite a mensagem do commit: " mensagem
    git add .
    git commit -m "$mensagem"
    git push origin main
    echo "✅ Alterações enviadas com sucesso!"
    ;;
  *)
    echo "❌ Opção inválida. Execute 'bash ngb.sh' novamente."
    ;;
esac
