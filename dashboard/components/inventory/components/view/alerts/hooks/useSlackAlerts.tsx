import { useEffect, useState } from 'react';
import settingsService from '../../../../../../services/settingsService';
import { View } from '../../../../hooks/useInventory/types/useInventoryTypes';

type useSlackAlertsProps = {
  view: View;
};

type SlackAlerts = {
  id: number;
  name: string;
  viewId: string;
  type: 'BUDGET' | 'USAGE';
  budget: number;
  usage: number;
};

function useSlackAlerts({ view }: useSlackAlertsProps) {
  const [loading, setLoading] = useState(true);
  const [hasSlack, setHasSlack] = useState(false);
  const [slackAlerts, setSlackAlerts] = useState<SlackAlerts[]>();
  const [error, setError] = useState(false);
  const viewId = view.id.toString();

  function fetchSlackStatus() {
    if (!loading) {
      setLoading(true);
    }

    if (error) {
      setError(false);
    }

    settingsService.getSlackIntegration().then(res => {
      if (res === Error) {
        setLoading(false);
        setError(true);
      } else {
        setLoading(false);
        setHasSlack(res.enabled);
      }
    });
  }

  function fetchViewAlerts() {
    if (!loading) {
      setLoading(true);
    }

    if (error) {
      setError(false);
    }

    settingsService.getSlackAlertsFromAView(viewId).then(res => {
      if (res === Error) {
        setLoading(false);
        setError(true);
      } else {
        setLoading(false);
        setSlackAlerts(res);
      }
    });
  }

  useEffect(() => {
    if (!hasSlack) {
      fetchSlackStatus();
    }

    if (hasSlack && viewId) {
      fetchViewAlerts();
    }
  }, [hasSlack]);

  const hasNoSlackAlerts = slackAlerts && slackAlerts.length === 0;

  return { loading, error, hasSlack, slackAlerts, hasNoSlackAlerts };
}

export default useSlackAlerts;
