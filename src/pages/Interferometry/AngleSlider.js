function AngleSlider({ inputValue, onChange }) {
  return (
    <div>
      0
      <input
        type="range"
        name="reflective index"
        min="0"
        max="40"
        step="1"
        value={inputValue}
        onChange={onChange}
        list="tickmarks"
      />
      2π
      <datalist id="tickmarks">
        <option value="0" label="0" />
        <option value="10" label="π/2" />
        <option value="20" label="π" />
        <option value="30" label="3π/2" />
        <option value="40" label="2π" />
      </datalist>
    </div>
  );
}

export default AngleSlider;
