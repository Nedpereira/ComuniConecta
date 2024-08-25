import { useSnackbar } from "notistack";

export const useCustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notificacao = (mensagem, status) => {
    enqueueSnackbar(mensagem, {
      variant: status,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      autoHideDuration: status === "error" ? 5000 : 3000,
    });
  };

  return notificacao;
};
