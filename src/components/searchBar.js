/**
 * Wires up the search input and its clear (×) button.
 *
 * @param {HTMLInputElement} input
 * @param {HTMLButtonElement} clearBtn
 * @param {(query: string) => void} onChange - called on every keystroke and on clear
 */
export function initSearchBar(input, clearBtn, onChange) {
  input.addEventListener("input", () => {
    const value = input.value.trim();
    clearBtn.classList.toggle("is-visible", value.length > 0);
    onChange(value);
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    clearBtn.classList.remove("is-visible");
    input.focus();
    onChange("");
  });
}
