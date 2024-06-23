export function parsearErroresAPI(response: any): string[] {
  const errores: string[] = [];

  if (response) {
    if (response.error) {
      if (typeof response.error === 'string') {
        errores.push(response.error);
      } else if (Array.isArray(response.error)) {
        errores.push(...response.error);
      } else if (response.error.errors) {
        const errorObj = response.error.errors;
        for (const campo in errorObj) {
          if (errorObj.hasOwnProperty(campo)) {
            const mensajes = errorObj[campo];
            for (const mensaje of mensajes) {
              errores.push(`${campo}: ${mensaje}`);
            }
          }
        }
      }
    }
  }

  return errores;
}

