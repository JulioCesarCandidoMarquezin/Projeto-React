export default function checkInput(input) {
    if (input) {}
    
    return !(
      input === null ||
      input === undefined ||
      input.trim() === "" ||
      !/^[a-zA-Z0-9_$]/.test(input)
    );
  }