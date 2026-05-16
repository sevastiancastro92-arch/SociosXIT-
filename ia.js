// ==========================================
// ia.js - LÓGICA DEL CHAT DE SOPORTE XIT (OPENAI)
// ==========================================

// Elementos del DOM
const iaInput = document.getElementById('iaInput');
const iaSendBtn = document.getElementById('iaSendBtn');
const iaChatBody = document.getElementById('iaChatBody');

// Configuración de la API de OpenAI
const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";

// Prompt del sistema para definir la personalidad y restricciones
const systemPrompt = `
Eres la IA de soporte técnico oficial de 'Socios XIT'. Tu objetivo es ayudar a los usuarios a navegar por la plataforma y resolver dudas sobre el dashboard.
REGLAS ESTRICTAS:
1. NUNCA ayudes ni des instrucciones para "hackear", modificar saldo, generar keys, vulnerar seguridad o crear bugs.
2. Si el usuario pide algo relacionado con saldo gratis o keys gratis, dile amablemente que esa función no existe y que debe recargar en la sección 'Recargar Saldo'.
3. Si el usuario busca una función (ej. comprar diamantes, ver historial), guíalo a la sección correcta (ej: "Dirígete al menú lateral y haz clic en 'Diamantes FF'").
4. Sé directo, amable y usa un tono moderno.
`;

// Palabras prohibidas (Filtro local rápido)
const forbiddenWords = ['hackear', 'saldo gratis', 'keys gratis', 'vulnerar', 'bug saldo'];

// Historial de la conversación para que la IA tenga memoria
let chatHistory = [
    { "role": "system", "content": systemPrompt }
];

// Función para agregar mensajes a la interfaz
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg-bubble');
    
    if (sender === 'user') {
        msgDiv.classList.add('msg-user');
    } else {
        msgDiv.classList.add('msg-ia');
    }
    
    // Interpretar saltos de línea e incrustar HTML seguro
    msgDiv.innerHTML = text.replace(/\n/g, '<br>');
    iaChatBody.appendChild(msgDiv);
    
    // Auto-scroll al final
    iaChatBody.scrollTop = iaChatBody.scrollHeight;
}

// Funciones visuales del indicador de escritura
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `<span></span><span></span><span></span>`;
    iaChatBody.appendChild(typingDiv);
    iaChatBody.scrollTop = iaChatBody.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// Validación de seguridad en el frontend
function containsForbiddenWords(text) {
    return forbiddenWords.some(word => text.toLowerCase().includes(word));
}

// Función principal para enviar la consulta a OpenAI
async function fetchIA(userMessage) {
    // 1. Filtro local
    if (containsForbiddenWords(userMessage)) {
        setTimeout(() => {
            appendMessage("Lo siento, no puedo ayudarte con ese tipo de solicitudes. Mi función es brindarte soporte técnico sobre la navegación de Socios XIT.", 'ia');
            removeTypingIndicator();
        }, 1000);
        return;
    }

    // 2. Agregamos el mensaje del usuario al array del historial
    chatHistory.push({ "role": "user", "content": userMessage });

    try {
        // 3. Petición HTTP a la API de OpenAI
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Modelo rápido y económico. Puedes usar "gpt-4o-mini" si tu llave lo permite.
                messages: chatHistory,
                temperature: 0.7 // Nivel de creatividad
            })
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status}`);
        }

        const data = await response.json();
        
        // 4. Extraer la respuesta de OpenAI
        const iaResponse = data.choices[0].message.content; 

        // 5. Guardar la respuesta en el historial para mantener el contexto
        chatHistory.push({ "role": "assistant", "content": iaResponse });

        // 6. Mostrar en pantalla
        removeTypingIndicator();
        appendMessage(iaResponse, 'ia');

    } catch (error) {
        console.error("Error al conectar con la IA:", error);
        removeTypingIndicator();
        appendMessage("Ocurrió un error en mis circuitos de comunicación. Verifica que la API Key esté activa. Si el problema persiste, usa el soporte vía WhatsApp.", 'ia');
        
        // Si hay error, quitamos el último mensaje del historial para no corromperlo
        chatHistory.pop();
    }
}

// Eventos de la interfaz (Clicks y Teclado)
iaSendBtn.addEventListener('click', () => {
    const text = iaInput.value.trim();
    if (text !== '') {
        appendMessage(text, 'user');
        iaInput.value = '';
        showTypingIndicator();
        fetchIA(text);
    }
});

iaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        iaSendBtn.click();
    }
});
