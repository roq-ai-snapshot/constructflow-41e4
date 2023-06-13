import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { costEstimationValidationSchema } from 'validationSchema/cost-estimations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.cost_estimation
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCostEstimationById();
    case 'PUT':
      return updateCostEstimationById();
    case 'DELETE':
      return deleteCostEstimationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCostEstimationById() {
    const data = await prisma.cost_estimation.findFirst(convertQueryToPrismaUtil(req.query, 'cost_estimation'));
    return res.status(200).json(data);
  }

  async function updateCostEstimationById() {
    await costEstimationValidationSchema.validate(req.body);
    const data = await prisma.cost_estimation.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCostEstimationById() {
    const data = await prisma.cost_estimation.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
