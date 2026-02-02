import { listProviders } from '../../providers/registry';

export default function handler(req, res) {
  try {
    const providers = listProviders();
    res.status(200).json({ success: true, providers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}