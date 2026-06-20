-- IMPORTANT: Run this inside your Supabase Dashboard SQL Editor
-- This creates a webhook trigger to call your Edge Function whenever a new row is added to emailed_results.

-- 1. Create a function that triggers a webhook request
CREATE OR REPLACE FUNCTION public.trigger_send_result_email()
RETURNS TRIGGER AS $$
DECLARE
  edge_function_url TEXT := 'YOUR_PROJECT_URL/functions/v1/send-result-email'; -- e.g., https://mdpuezlydlijbxeooqwq.supabase.co/functions/v1/send-result-email
  auth_header TEXT := 'Bearer YOUR_ANON_KEY'; -- Put your actual anon key here!
  payload JSON;
BEGIN
  -- Build the JSON payload to send to the edge function
  payload := json_build_object(
    'type', 'INSERT',
    'table', 'emailed_results',
    'record', row_to_json(NEW)
  );

  -- Perform the HTTP POST request to the Edge Function using the pg_net extension
  PERFORM net.http_post(
    url := edge_function_url,
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', auth_header),
    body := payload::jsonb
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Bind the trigger function to the emailed_results table
DROP TRIGGER IF EXISTS on_emailed_result_insert ON public.emailed_results;
CREATE TRIGGER on_emailed_result_insert
  AFTER INSERT ON public.emailed_results
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_send_result_email();
