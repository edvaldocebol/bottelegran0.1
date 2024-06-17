const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Função para enviar mensagens com opções inline
function sendWithOptions(chatId, text, options) {
    bot.sendMessage(chatId, text, { reply_markup: { inline_keyboard: options } });
}

// Comando /start para iniciar a conversa
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || 'usuário';
    bot.sendMessage(chatId, `Olá Bem vindo ${username}! Para começar digite /iniciar`);
});

// Comando /iniciar para exibir o menu principal
bot.onText(/\/iniciar/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || 'usuário';
    const options = [
        [{ text: 'Comprar produto', callback_data: 'comprar_produto' }],
        [{ text: 'Pesquisar produto por categoria', callback_data: 'pesquisar_categoria' }]
    ];
    sendWithOptions(chatId, `${username}! Como posso te ajudar?`, options);
});

// Escutar eventos de callback_query para responder aos botões inline
bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
    const username = callbackQuery.from.username || 'usuário';

    switch (data) {
        case 'comprar_produto':
            const comprarOptions = [
                [{ text: 'Zap Suite - bot de automações de vendas no WhatsApp', callback_data: 'zap_suite' }],
                [{ text: 'Voltar', callback_data: 'voltar' }]
            ];
            sendWithOptions(chatId, `${username}, qual produto deseja comprar?`, comprarOptions);
            break;

        case 'pesquisar_categoria':
            bot.sendMessage(chatId, 'Em desenvolvimento...');
            break;

        case 'zap_suite':
            const zapSuiteOptions = [
                [{ text: 'Sim', callback_data: 'info_zap_suite' }],
                [{ text: 'Não, Acessar o link de compra', callback_data: 'link_compra_zap_suite' }],
                [{ text: 'Voltar', callback_data: 'comprar_produto' }]
            ];
            sendWithOptions(chatId, `${username}, gostaria de ver informações sobre o produto?`, zapSuiteOptions);
            break;

        case 'info_zap_suite':
            const infoZapSuiteOptions = [
                [{ text: 'Voltar', callback_data: 'zap_suite' }]
            ];
            bot.sendMessage(chatId, `O Zap Suite é a solução perfeita para otimizar o atendimento no WhatsApp. Com uma interface simples e intuitiva, mesmo usuários com pouca experiência em tecnologia podem usá-lo facilmente. Grave, salve funis de vendas e automatize respostas em texto e áudio com um clique. Flexível, respeita os intervalos definidos pelo usuário. Ideal para pequenos empresários em busca de eficiência e empreendedores digitais que trabalham com WhatsApp. Versátil e acessível, o Zap Suite é a chave para um atendimento consistente e operações otimizadas.`, { reply_markup: { inline_keyboard: infoZapSuiteOptions } });
            break;

        case 'link_compra_zap_suite':
            bot.sendMessage(chatId, 'Segue o link de compra: https://bit.ly/zapsuitebotautomaticodevendas');
            break;

        case 'voltar':
            const mainMenuOptions = [
                [{ text: 'Comprar produto', callback_data: 'comprar_produto' }],
                [{ text: 'Pesquisar produto por categoria', callback_data: 'pesquisar_categoria' }]
            ];
            sendWithOptions(chatId, `${username}, como posso te ajudar?`, mainMenuOptions);
            break;

        default:
            bot.sendMessage(chatId, 'Opção inválida. Por favor, escolha uma das opções disponíveis.');
            break;
    }
});

// Comando /help para exibir a ajuda
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Aqui estão os comandos disponíveis:\n/iniciar - Iniciar o bot\n/help - Exibir ajuda');
});
