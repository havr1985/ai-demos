export type ChatRequest = {
  message: string;
  sessionId: string;
};

export type ChatResponse = {
  response: string;
  sessionId: string;
};

export type ChatErrorResponse = {
  error: string;
};
