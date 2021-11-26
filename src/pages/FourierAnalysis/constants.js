export const MODE = {
  EDIT: "Edit",
  VIEW: "View"
};

export const PRESETS = {
  "Some wave": () => {
    return {
      harmonics: [
        [0,0.2], [0,0.2], [0,0.2], [0,0.2], [0,0.2]
      ]
    }
  },
  "Cosine": () => {
    return {
      harmonics: [
        [0,0], [0,1]
      ]
    }
  }
};
