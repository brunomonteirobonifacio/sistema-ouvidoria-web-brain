// this script creates input masks when called by a page

if ($('.cpf')) {
    $('.cpf').mask('000.000.000-00');
}

if ($('.phone')) {
    $('.phone').mask('(00) 00000-0000');
}