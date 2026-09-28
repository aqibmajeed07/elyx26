import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Coordinator, Committee } from '../types';
import { OVERALL_COORDINATORS, COMMITTEES } from '../data/seedData';

export interface DbCoordinator {
  id: string;
  name: string;
  phone: string;
  email?: string;
  department: string;
  role?: string;
  committee_name?: string;
}

export const coordinatorService = {
  /**
   * Fetches all coordinators from Supabase, organized into overall coordinators and committees.
   */
  async fetchCoordinators(): Promise<{
    overall: Coordinator[];
    committees: Committee[];
    all: DbCoordinator[];
    error: Error | null;
  }> {
    if (!isSupabaseConfigured) {
      return {
        overall: OVERALL_COORDINATORS,
        committees: COMMITTEES,
        all: [
          ...OVERALL_COORDINATORS.map((c) => ({
            id: c.name,
            name: c.name,
            department: c.department,
            phone: c.phone,
            email: c.email,
            role: c.role || 'Overall Coordinator',
            committee_name: 'Overall Coordinators',
          })),
          ...COMMITTEES.flatMap((comm) =>
            comm.members.map((m) => ({
              id: m.name,
              name: m.name,
              department: m.department,
              phone: m.phone,
              email: m.email,
              role: m.role || 'Committee Member',
              committee_name: comm.name,
            }))
          ),
        ],
        error: null,
      };
    }

    try {
      const { data, error } = await supabase
        .from('coordinators')
        .select('*')
        .order('name', { ascending: true });

      if (error || !data || data.length === 0) {
        return {
          overall: OVERALL_COORDINATORS,
          committees: COMMITTEES,
          all: [
            ...OVERALL_COORDINATORS.map((c) => ({
              id: c.name,
              name: c.name,
              department: c.department,
              phone: c.phone,
              email: c.email,
              role: c.role || 'Overall Coordinator',
              committee_name: 'Overall Coordinators',
            })),
            ...COMMITTEES.flatMap((comm) =>
              comm.members.map((m) => ({
                id: m.name,
                name: m.name,
                department: m.department,
                phone: m.phone,
                email: m.email,
                role: m.role || 'Committee Member',
                committee_name: comm.name,
              }))
            ),
          ],
          error: error ? new Error(error.message) : null,
        };
      }

      const overall: Coordinator[] = data
        .filter((c) => c.committee_name === 'Overall Coordinators' || c.role === 'Overall Coordinator')
        .map((c) => ({
          name: c.name,
          department: c.department,
          phone: c.phone,
          email: c.email || undefined,
          role: c.role || 'Overall Coordinator',
          committee_name: c.committee_name,
        }));

      // Group committee members
      const committeeMap = new Map<string, Coordinator[]>();
      data
        .filter((c) => c.committee_name && c.committee_name !== 'Overall Coordinators')
        .forEach((c) => {
          const list = committeeMap.get(c.committee_name) || [];
          list.push({
            name: c.name,
            department: c.department,
            phone: c.phone,
            email: c.email || undefined,
            role: c.role || 'Committee Member',
            committee_name: c.committee_name,
          });
          committeeMap.set(c.committee_name, list);
        });

      const committees: Committee[] = Array.from(committeeMap.entries()).map(([name, members]) => ({
        name,
        members,
      }));

      return {
        overall: overall.length > 0 ? overall : OVERALL_COORDINATORS,
        committees: committees.length > 0 ? committees : COMMITTEES,
        all: data as DbCoordinator[],
        error: null,
      };
    } catch (err) {
      return {
        overall: OVERALL_COORDINATORS,
        committees: COMMITTEES,
        all: [],
        error: err as Error,
      };
    }
  },
};
