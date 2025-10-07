import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Stack,
  Badge,
  Button,
  Text,
} from '@contentful/f36-components';
import { SidebarAppSDK } from '@contentful/app-sdk';
import { useSDK, useAutoResizer } from '@contentful/react-apps-toolkit';

type AvailabilityStatus = 'Available' | 'Sold' | 'Not for Sale';

const Sidebar = () => {
  const sdk = useSDK<SidebarAppSDK>();
  useAutoResizer();

  const [availability, setAvailability] = useState<AvailabilityStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Read the current availability value from the entry
  useEffect(() => {
    const availabilityField = sdk.entry.fields.availability;
    
    if (!availabilityField) {
      setError('Availability field not found on this entry');
      return;
    }

    // Get initial value
    const currentValue = availabilityField.getValue() as AvailabilityStatus;
    setAvailability(currentValue);

    // Listen for changes to the field
    const detach = availabilityField.onValueChanged((value: AvailabilityStatus) => {
      setAvailability(value);
    });

    return () => {
      detach();
    };
  }, [sdk.entry.fields.availability]);

  // Update the availability status
  const updateAvailability = useCallback(
    async (newStatus: AvailabilityStatus) => {
      setIsLoading(true);
      setError(null);

      try {
        const availabilityField = sdk.entry.fields.availability;
        
        if (!availabilityField) {
          throw new Error('Availability field not found');
        }

        await availabilityField.setValue(newStatus);
        
        // Publish the entry after updating
        await sdk.entry.publish();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update availability';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [sdk.entry]
  );

  // Toggle between Available and Sold
  const toggleAvailability = useCallback(() => {
    if (availability === 'Available') {
      updateAvailability('Sold');
    } else if (availability === 'Sold') {
      updateAvailability('Available');
    } else {
      // If "Not for Sale", default to Available
      updateAvailability('Available');
    }
  }, [availability, updateAvailability]);

  // Get badge variant based on status
  const getBadgeVariant = (status: AvailabilityStatus | null): 'positive' | 'negative' | 'warning' => {
    switch (status) {
      case 'Available':
        return 'positive';
      case 'Sold':
        return 'negative';
      case 'Not for Sale':
        return 'warning';
      default:
        return 'warning';
    }
  };

  // Get button text based on current status
  const getToggleButtonText = (): string => {
    if (availability === 'Available') {
      return 'Mark as Sold';
    } else if (availability === 'Sold') {
      return 'Mark as Available';
    } else {
      return 'Mark as Available';
    }
  };

  if (error && !availability) {
    return (
      <Box padding="spacingS">
        <Text fontSize="fontSizeS">Error: {error}</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Stack flexDirection="column" spacing="spacingS" alignItems="flex-start">
        {availability && (
          <>
            <Stack flexDirection="row" alignItems="center" spacing="spacingXs">
              <Text fontSize="fontSizeS" fontColor="gray600">Status:</Text>
              <Badge variant={getBadgeVariant(availability)} size="small">
                {availability}
              </Badge>
            </Stack>

            <Stack flexDirection="row" spacing="spacingXs" style={{ width: '100%' }}>
              {availability === 'Not for Sale' ? (
                <>
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => updateAvailability('Available')}
                    isDisabled={isLoading}
                    style={{ flex: 1 }}
                  >
                    Mark Available
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => updateAvailability('Sold')}
                    isDisabled={isLoading}
                    style={{ flex: 1 }}
                  >
                    Mark Sold
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="primary"
                    size="small"
                    onClick={toggleAvailability}
                    isDisabled={isLoading}
                    style={{ flex: 1 }}
                  >
                    {getToggleButtonText()}
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => updateAvailability('Not for Sale')}
                    isDisabled={isLoading}
                    style={{ flex: 1 }}
                  >
                    Not for Sale
                  </Button>
                </>
              )}
            </Stack>
          </>
        )}

        {!availability && !error && (
          <Text fontSize="fontSizeS">No availability data found</Text>
        )}
      </Stack>
    </Box>
  );
};

export default Sidebar;
