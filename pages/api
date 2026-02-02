import { listProviders } from '../../providers/registry';

export default function handler(req, res) {
  const endpoints = ['GET /api/health','GET /api/status','GET /api/providers'];
  const providers = listProviders();
  res.status(200).json({ success:true, endpoints, providers });
}