(function exposeSecurityHelpers(root) {
    const HTML_ESCAPES = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => HTML_ESCAPES[char]);
    }

    function renderBasicMessage(value) {
        const escaped = escapeHtml(value);
        const withStrong = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        return withStrong
            .split(/\n{2,}/)
            .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
            .join('');
    }

    function serializeForInlineScript(value) {
        return JSON.stringify(value)
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
            .replace(/&/g, '\\u0026')
            .replace(/\u2028/g, '\\u2028')
            .replace(/\u2029/g, '\\u2029');
    }

    function escapeInlineHandlerString(value) {
        return String(value ?? '')
            .replace(/\\/g, '\\\\')
            .replace(/'/g, '\\x27')
            .replace(/"/g, '\\x22')
            .replace(/</g, '\\x3c')
            .replace(/>/g, '\\x3e')
            .replace(/&/g, '\\x26')
            .replace(/\r/g, '\\r')
            .replace(/\n/g, '\\n')
            .replace(/\u2028/g, '\\u2028')
            .replace(/\u2029/g, '\\u2029');
    }

    const helpers = {
        escapeHtml,
        renderBasicMessage,
        serializeForInlineScript,
        escapeInlineHandlerString,
    };
    root.CBTSecurity = helpers;
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = helpers;
    }
})(typeof window !== 'undefined' ? window : globalThis);
