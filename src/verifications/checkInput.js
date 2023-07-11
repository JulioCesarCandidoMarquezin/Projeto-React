export default function checkInput(input) {
    if (input) {
      if (/^[a-zA-Z0-9_$]/.test(input)) {
        return true
      }
    }
    return false
  }
  