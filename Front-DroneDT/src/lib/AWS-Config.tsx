// src/lib/AWS-Config.tsx
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { S3Client } from "@aws-sdk/client-s3";

/**
 * AWS Configuration - Drone DT Ecosystem
 * Centraliza la conexión con S3 para multimedia y Cognito para Identity.
 */

// Configuración regional
const REGION = process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1";

// 1. Cliente de S3 (Para almacenamiento de imágenes de drones y facturas)
export const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
  },
});

// 2. Cliente de Cognito (Para gestión de usuarios escalable)
export const cognitoClient = new CognitoIdentityClient({
  region: REGION,
});

/**
 * Helper para generar URLs de S3
 * Útil para mostrar fotos de drones guardadas en tus buckets.
 */
export const getS3Url = (key: string) => {
  const bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
  return `https://${bucket}.s3.${REGION}.amazonaws.com/${key}`;
};

/**
 * Constantes de Configuración de Infraestructura
 */
export const AWS_CONFIG = {
  bucketName: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
  userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
  clientId: process.env.NEXT_PUBLIC_AWS_CLIENT_ID,
  identityPoolId: process.env.NEXT_PUBLIC_AWS_IDENTITY_POOL_ID,
};

// Log de inicialización para desarrollo (Solo en modo debug)
if (process.env.NODE_ENV === 'development') {
  console.log('// AWS Infrastructure Initialized [Software DT Protocol]');
}