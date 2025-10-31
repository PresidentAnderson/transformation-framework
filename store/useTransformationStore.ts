import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * Type definitions for the Transformation Framework Store
 */

/**
 * Dimension types representing different transformation areas
 */
export type DimensionType = 'temporal' | 'depth' | 'relational';

/**
 * Animation state for controlling visualization playback
 */
export type AnimationState = 'playing' | 'paused' | 'stopped';

/**
 * User interaction mode
 */
export type InteractionMode = 'explore' | 'guided';

/**
 * Represents a single phase within a dimension
 */
export interface TransformationPhase {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  startedAt?: Date;
  completedAt?: Date;
  metadata?: Record<string, unknown>;
}

/**
 * Data structure for transformation visualization
 */
export interface TransformationData {
  id: string;
  dimensionId: DimensionType;
  timestamp: number;
  value: number;
  metadata?: Record<string, unknown>;
}

/**
 * State structure for dimension-specific data
 */
export interface DimensionState {
  id: DimensionType;
  activePhaseId: string | null;
  phases: TransformationPhase[];
  progress: number; // 0-100
  isComplete: boolean;
  startedAt?: Date;
  completedAt?: Date;
}

/**
 * Main store state interface
 */
export interface TransformationStoreState {
  // Dimension management
  selectedDimension: DimensionType | null;
  dimensions: Record<DimensionType, DimensionState>;

  // Animation control
  animationState: AnimationState;
  animationSpeed: number; // 0.5 - 2.0x

  // User interaction
  interactionMode: InteractionMode;
  isUIVisible: boolean;

  // Visualization data
  transformationData: TransformationData[];
  selectedDataPointId: string | null;

  // UI state
  sidebarOpen: boolean;
  showGuide: boolean;

  // Actions
  selectDimension: (dimension: DimensionType | null) => void;
  setActivePhase: (dimensionId: DimensionType, phaseId: string | null) => void;
  completePhase: (dimensionId: DimensionType, phaseId: string) => void;
  updateDimensionProgress: (dimensionId: DimensionType, progress: number) => void;
  resetDimension: (dimensionId: DimensionType) => void;

  // Animation actions
  playAnimation: () => void;
  pauseAnimation: () => void;
  stopAnimation: () => void;
  setAnimationSpeed: (speed: number) => void;

  // Interaction actions
  setInteractionMode: (mode: InteractionMode) => void;
  toggleUIVisibility: () => void;
  toggleSidebar: () => void;
  toggleGuide: () => void;

  // Data actions
  addTransformationData: (data: TransformationData) => void;
  updateTransformationData: (id: string, data: Partial<TransformationData>) => void;
  clearTransformationData: () => void;
  selectDataPoint: (dataPointId: string | null) => void;

  // Batch operations
  resetAllDimensions: () => void;
  resetStore: () => void;
}

/**
 * Initial state factory function
 */
const createInitialState = (): Omit<
  TransformationStoreState,
  keyof {
    [K in keyof TransformationStoreState as TransformationStoreState[K] extends Function
      ? K
      : never]: any;
  }
> => ({
  selectedDimension: null,
  dimensions: {
    temporal: {
      id: 'temporal',
      activePhaseId: null,
      phases: [
        {
          id: 'past-reflection',
          name: 'Past Reflection',
          description: 'Understanding your personal history',
          completed: false,
        },
        {
          id: 'present-awareness',
          name: 'Present Awareness',
          description: 'Current state assessment',
          completed: false,
        },
        {
          id: 'future-vision',
          name: 'Future Vision',
          description: 'Envisioning your goals',
          completed: false,
        },
      ],
      progress: 0,
      isComplete: false,
    },
    depth: {
      id: 'depth',
      activePhaseId: null,
      phases: [
        {
          id: 'surface-awareness',
          name: 'Surface Awareness',
          description: 'Identifying surface behaviors',
          completed: false,
        },
        {
          id: 'core-values',
          name: 'Core Values',
          description: 'Discovering underlying values',
          completed: false,
        },
        {
          id: 'integration',
          name: 'Integration',
          description: 'Integrating insights',
          completed: false,
        },
      ],
      progress: 0,
      isComplete: false,
    },
    relational: {
      id: 'relational',
      activePhaseId: null,
      phases: [
        {
          id: 'self-connection',
          name: 'Self Connection',
          description: 'Building self-awareness',
          completed: false,
        },
        {
          id: 'others-connection',
          name: 'Others Connection',
          description: 'Improving interpersonal relationships',
          completed: false,
        },
        {
          id: 'systems-alignment',
          name: 'Systems Alignment',
          description: 'Aligning with broader systems',
          completed: false,
        },
      ],
      progress: 0,
      isComplete: false,
    },
  },
  animationState: 'paused',
  animationSpeed: 1.0,
  interactionMode: 'explore',
  isUIVisible: true,
  transformationData: [],
  selectedDataPointId: null,
  sidebarOpen: true,
  showGuide: false,
});

/**
 * Create the Zustand store with middleware
 */
export const useTransformationStore = create<TransformationStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        ...createInitialState(),

        // Dimension Management Actions
        selectDimension: (dimension) =>
          set(
            { selectedDimension: dimension },
            false,
            { type: 'selectDimension', dimension }
          ),

        setActivePhase: (dimensionId, phaseId) =>
          set(
            (state) => ({
              dimensions: {
                ...state.dimensions,
                [dimensionId]: {
                  ...state.dimensions[dimensionId],
                  activePhaseId: phaseId,
                },
              },
            }),
            false,
            { type: 'setActivePhase', dimensionId, phaseId }
          ),

        completePhase: (dimensionId, phaseId) =>
          set(
            (state) => {
              const dimension = state.dimensions[dimensionId];
              const updatedPhases = dimension.phases.map((phase) =>
                phase.id === phaseId
                  ? {
                      ...phase,
                      completed: true,
                      completedAt: new Date(),
                    }
                  : phase
              );

              const completedCount = updatedPhases.filter(
                (p) => p.completed
              ).length;
              const progress = Math.round(
                (completedCount / updatedPhases.length) * 100
              );
              const isComplete = progress === 100;

              return {
                dimensions: {
                  ...state.dimensions,
                  [dimensionId]: {
                    ...dimension,
                    phases: updatedPhases,
                    progress,
                    isComplete,
                    completedAt: isComplete ? new Date() : dimension.completedAt,
                  },
                },
              };
            },
            false,
            { type: 'completePhase', dimensionId, phaseId }
          ),

        updateDimensionProgress: (dimensionId, progress) =>
          set(
            (state) => ({
              dimensions: {
                ...state.dimensions,
                [dimensionId]: {
                  ...state.dimensions[dimensionId],
                  progress: Math.max(0, Math.min(100, progress)),
                  isComplete: progress >= 100,
                  completedAt:
                    progress >= 100
                      ? new Date()
                      : state.dimensions[dimensionId].completedAt,
                },
              },
            }),
            false,
            { type: 'updateDimensionProgress', dimensionId, progress }
          ),

        resetDimension: (dimensionId) =>
          set(
            (state) => ({
              dimensions: {
                ...state.dimensions,
                [dimensionId]: {
                  ...state.dimensions[dimensionId],
                  activePhaseId: null,
                  phases: state.dimensions[dimensionId].phases.map((p) => ({
                    ...p,
                    completed: false,
                    completedAt: undefined,
                  })),
                  progress: 0,
                  isComplete: false,
                  completedAt: undefined,
                },
              },
            }),
            false,
            { type: 'resetDimension', dimensionId }
          ),

        // Animation Control Actions
        playAnimation: () =>
          set(
            { animationState: 'playing' },
            false,
            { type: 'playAnimation' }
          ),

        pauseAnimation: () =>
          set(
            { animationState: 'paused' },
            false,
            { type: 'pauseAnimation' }
          ),

        stopAnimation: () =>
          set(
            { animationState: 'stopped' },
            false,
            { type: 'stopAnimation' }
          ),

        setAnimationSpeed: (speed) =>
          set(
            {
              animationSpeed: Math.max(0.5, Math.min(2.0, speed)),
            },
            false,
            { type: 'setAnimationSpeed', speed }
          ),

        // Interaction Mode Actions
        setInteractionMode: (mode) =>
          set(
            { interactionMode: mode },
            false,
            { type: 'setInteractionMode', mode }
          ),

        toggleUIVisibility: () =>
          set(
            (state) => ({ isUIVisible: !state.isUIVisible }),
            false,
            { type: 'toggleUIVisibility' }
          ),

        toggleSidebar: () =>
          set(
            (state) => ({ sidebarOpen: !state.sidebarOpen }),
            false,
            { type: 'toggleSidebar' }
          ),

        toggleGuide: () =>
          set(
            (state) => ({ showGuide: !state.showGuide }),
            false,
            { type: 'toggleGuide' }
          ),

        // Transformation Data Actions
        addTransformationData: (data) =>
          set(
            (state) => ({
              transformationData: [...state.transformationData, data],
            }),
            false,
            { type: 'addTransformationData', data }
          ),

        updateTransformationData: (id, updatedData) =>
          set(
            (state) => ({
              transformationData: state.transformationData.map((item) =>
                item.id === id ? { ...item, ...updatedData } : item
              ),
            }),
            false,
            { type: 'updateTransformationData', id, updatedData }
          ),

        clearTransformationData: () =>
          set(
            { transformationData: [], selectedDataPointId: null },
            false,
            { type: 'clearTransformationData' }
          ),

        selectDataPoint: (dataPointId) =>
          set(
            { selectedDataPointId: dataPointId },
            false,
            { type: 'selectDataPoint', dataPointId }
          ),

        // Batch Operations
        resetAllDimensions: () =>
          set(
            (state) => {
              const resetDimensions = (
                Object.keys(state.dimensions) as DimensionType[]
              ).reduce(
                (acc, dimensionId) => {
                  acc[dimensionId] = {
                    ...state.dimensions[dimensionId],
                    activePhaseId: null,
                    phases: state.dimensions[dimensionId].phases.map((p) => ({
                      ...p,
                      completed: false,
                      completedAt: undefined,
                    })),
                    progress: 0,
                    isComplete: false,
                    completedAt: undefined,
                  };
                  return acc;
                },
                {} as Record<DimensionType, DimensionState>
              );

              return {
                dimensions: resetDimensions,
                selectedDimension: null,
                transformationData: [],
                selectedDataPointId: null,
              };
            },
            false,
            { type: 'resetAllDimensions' }
          ),

        resetStore: () =>
          set(createInitialState(), false, { type: 'resetStore' }),
      }),
      {
        name: 'transformation-store',
        partialize: (state) => ({
          selectedDimension: state.selectedDimension,
          dimensions: state.dimensions,
          animationSpeed: state.animationSpeed,
          interactionMode: state.interactionMode,
          transformationData: state.transformationData,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    )
  )
);

/**
 * Selector hooks for common use cases
 */

export const useSelectedDimension = () =>
  useTransformationStore((state) => state.selectedDimension);

export const useDimensions = () =>
  useTransformationStore((state) => state.dimensions);

export const useDimensionState = (dimensionId: DimensionType) =>
  useTransformationStore((state) => state.dimensions[dimensionId]);

export const useAnimationState = () =>
  useTransformationStore((state) => ({
    state: state.animationState,
    speed: state.animationSpeed,
  }));

export const useInteractionMode = () =>
  useTransformationStore((state) => state.interactionMode);

export const useTransformationData = () =>
  useTransformationStore((state) => state.transformationData);

export const useSelectedDataPoint = () =>
  useTransformationStore((state) => state.selectedDataPointId);

export const useDimensionProgress = (dimensionId: DimensionType) =>
  useTransformationStore(
    (state) => state.dimensions[dimensionId].progress
  );

export const useActiveDimensions = () =>
  useTransformationStore((state) =>
    (Object.keys(state.dimensions) as DimensionType[]).filter(
      (id) => state.dimensions[id].progress > 0
    )
  );
