import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getCostEstimationById, updateCostEstimationById } from 'apiSdk/cost-estimations';
import { Error } from 'components/error';
import { costEstimationValidationSchema } from 'validationSchema/cost-estimations';
import { CostEstimationInterface } from 'interfaces/cost-estimation';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ProjectInterface } from 'interfaces/project';
import { getProjects } from 'apiSdk/projects';

function CostEstimationEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<CostEstimationInterface>(
    () => (id ? `/cost-estimations/${id}` : null),
    () => getCostEstimationById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CostEstimationInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCostEstimationById(id, values);
      mutate(updated);
      resetForm();
      router.push('/cost-estimations');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<CostEstimationInterface>({
    initialValues: data,
    validationSchema: costEstimationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Cost Estimation
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="estimated_cost" mb="4" isInvalid={!!formik.errors?.estimated_cost}>
              <FormLabel>Estimated Cost</FormLabel>
              <NumberInput
                name="estimated_cost"
                value={formik.values?.estimated_cost}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('estimated_cost', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.estimated_cost && <FormErrorMessage>{formik.errors?.estimated_cost}</FormErrorMessage>}
            </FormControl>
            <FormControl id="actual_cost" mb="4" isInvalid={!!formik.errors?.actual_cost}>
              <FormLabel>Actual Cost</FormLabel>
              <NumberInput
                name="actual_cost"
                value={formik.values?.actual_cost}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('actual_cost', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.actual_cost && <FormErrorMessage>{formik.errors?.actual_cost}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<ProjectInterface>
              formik={formik}
              name={'project_id'}
              label={'Select Project'}
              placeholder={'Select Project'}
              fetcher={getProjects}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'cost_estimation',
  operation: AccessOperationEnum.UPDATE,
})(CostEstimationEditPage);
