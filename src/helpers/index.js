// const thread = threads.find((thread) => thread.id === threadId);
export const findById = (sources, targetId) => {
  return sources.find((src) => src.id === targetId);
};

export const upsert = (sources, source) => {
  const index = sources.findIndex((src) => src.id === source.id);

  if (source.id && index !== -1) {
    sources[index] = source;
  } else {
    sources.push(source);
  }
};
