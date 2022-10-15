/*****
 * Symbols and Styling
 ****/

function symbolSkip() {
    return $(`<svg xmlns="http://www.w3.org/2000/svg" class="text-custom-mg w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>`)
}

function symbolIncorrect() {
    return $(`<svg xmlns="http://www.w3.org/2000/svg" class="text-custom-negative w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`)
}

function styleGuessRowSymbol() {
    return $(`<div class="mr-2"></div>`);
}

function styleGuessRowTitle() {
    return $(`<div class="flex flex-1 justify-between items-center"></div>`);
}

function styleGuessRowTitleSkipped() {
    return $(`<div class="text-custom-mg tracking-widest font-semibold"></div>`);
}

function styleGuessRowTitleSong() {
    return $(`<div class="text-white text-sm"></div>`);
}