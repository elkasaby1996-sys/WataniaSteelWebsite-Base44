const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `mock-${Math.random().toString(36).slice(2)}`;
};

const emptyList = async () => [];
const noopCreate = async (data) => ({ id: createId(), ...data });
const noopUpdate = async (id, data) => ({ id, ...data });

const entity = {
  list: emptyList,
  create: noopCreate,
  update: noopUpdate,
};

export const base44 = {
  entities: {
    Project: entity,
    Product: entity,
    Inquiry: entity,
    Order: entity,
    QuoteRequest: entity,
  },
  integrations: {
    Core: {
      UploadFile: async () => ({ file_url: '' }),
    },
  },
};
