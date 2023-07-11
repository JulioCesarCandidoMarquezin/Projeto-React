export default function existElementWithDuplicatedName(attributes, value) {
  const isSameName = attributes.some((attribute) => {
    const isDuplicate = attribute.name.toLowerCase() === value.toLowerCase();
    return isDuplicate;
  });
  return isSameName;
}
