const test = require('node:test');
const assert = require('node:assert/strict');

const {
    escapeHtml,
    renderBasicMessage,
    serializeForInlineScript,
    escapeInlineHandlerString,
} = require('../frontend/js/security.js');

test('escapeHtml neutralizes elements and event handlers', () => {
    const payload = `<img src=x onerror="alert('x')">`;
    const result = escapeHtml(payload);

    assert.equal(result, '&lt;img src=x onerror=&quot;alert(&#39;x&#39;)&quot;&gt;');
    assert.equal(result.includes('<img'), false);
});

test('renderBasicMessage escapes input before adding the small formatting allowlist', () => {
    const result = renderBasicMessage('**安全**\n\n<script>alert(1)</script>');

    assert.equal(result, '<p><strong>安全</strong></p><p>&lt;script&gt;alert(1)&lt;/script&gt;</p>');
});

test('serializeForInlineScript cannot close the surrounding script element', () => {
    const result = serializeForInlineScript(['</script><img src=x onerror=alert(1)>']);

    assert.equal(result.includes('</script>'), false);
    assert.match(result, /\\u003c\/script\\u003e/);
});

test('escapeInlineHandlerString cannot break JavaScript or HTML attribute boundaries', () => {
    const result = escapeInlineHandlerString(`');alert(1);//\"</button>\n`);

    assert.equal(result.includes("'"), false);
    assert.equal(result.includes('"'), false);
    assert.equal(result.includes('<'), false);
    assert.equal(result.includes('>'), false);
    assert.equal(result.includes('\n'), false);
    assert.match(result, /\\x27/);
    assert.match(result, /\\x22/);
    assert.match(result, /\\x3c/);
});
