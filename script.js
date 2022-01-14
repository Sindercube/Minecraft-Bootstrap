function toggle(element) {
  let value = (element.value == "true")
  const parent = element.parentElement;
  let html_div = parent.getElementsByClassName('html')[0];
  let code_div = parent.getElementsByClassName('code')[0];

  if (value) {
    html_div.style.display = 'none';
    code_div.style.display = 'block';
    element.innerHTML = "Show HTML"
  } else {
    code_div.style.display = 'none';
    html_div.style.display = 'block';
    element.innerHTML = "Show Code"
  }
  element.value = !value
}

function copy(element) {
  const html_div = element.parentElement.getElementsByClassName('html')[0];
  navigator.clipboard.writeText(html_div.innerHTML.trim());
  element.innerHTML = "Copied!";
  setTimeout(() => {  element.innerHTML = "Copy"; }, 3000);
}

function main() {
  for(const html_div of document.getElementsByClassName('html')) {
    const parent = html_div.parentElement;
    let code_div = document.createElement('div');
    let pre = document.createElement('pre');
    let code = document.createElement('code');
    code.classList.add('code');

    code.innerHTML = formatHTML(escapeHTML(html_div));

    pre.appendChild(code);
    code_div.appendChild(pre);
    parent.appendChild(code_div);
  }
}

let escape = document.createElement('textarea');
function escapeHTML(html) {
    escape.textContent = html.innerHTML;
    return escape.innerHTML.trim();
}

function formatHTML(html) {
    var html = html.replace(/\&lt;(?!!)(.+?)\&gt;/g, `<code class='code-tag'>$&</code>`);
    var html = html.replace(/\"(.+?)\"/g, `<code class='code-string'>$&</code>`);
    var html = html.replace(/\&lt;!--(.+?)\--&gt;/g, `<code class='code-comment'>$&</code>`);
    return html;
}